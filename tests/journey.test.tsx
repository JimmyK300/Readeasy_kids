// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { lessons } from '../src/content/lessons';
import { stages, practiceLines, suggestLesson } from '../src/content/journey';
import ReadingPractice from '../src/components/ReadingPractice';
const state = vi.hoisted(() => ({ user: null as null | {uid: string}, progress: {} as Record<string, {lessonId: string; score: number; total: number; completed: true}> }));
vi.mock('../src/context/authContext', () => ({useAccount: () => ({user: state.user})}));
vi.mock('../src/context/dataContext', () => ({useLearning: () => ({progress: state.progress, syncStatus:'Tiến độ đã đồng bộ', syncError:''})}));
import Guardian from '../src/pages/Guardian';
afterEach(() => {cleanup(); state.user = null; state.progress = {};});
const completed = (score: number) => ({lessonId: lessons[0].id, score, total: 3, completed: true as const});
describe('bounded reading journey', () => {
  it('covers all reviewed stories once in existing order with verified practice lines', () => {
    expect(stages.flatMap(stage => [...stage.ids])).toEqual(lessons.map(lesson => lesson.id));
    for (const lesson of lessons) {
      const [before, after] = practiceLines[lesson.id];
      expect(before).toBeLessThan(after);
      expect(lesson.story[before]).toBeTruthy();
      expect(lesson.story[after]).toBeTruthy();
    }
  });
  it('offers first unread, incomplete session resume, supported review and finished journey reread', () => {
    expect(suggestLesson({}).lesson.id).toBe(lessons[0].id);
    expect(suggestLesson({[lessons[0].id]: completed(2)}).lesson.id).toBe(lessons[1].id);
    expect(suggestLesson({[lessons[0].id]: completed(1)}).action).toBe('Cùng luyện lại');
    expect(suggestLesson({}, {[lessons[3].id]: {answers:['Rửa tay'], completed:false}}).lesson.id).toBe(lessons[3].id);
    const all = Object.fromEntries(lessons.map(lesson => [lesson.id, {...completed(3), lessonId:lesson.id}]));
    expect(suggestLesson(all).action).toBe('Đọc lại câu chuyện');
    expect(Object.keys(all)).toHaveLength(7);
  });
  it('lets a child correct and reset optional sentence-order practice', async () => {
    render(<ReadingPractice lesson={lessons[0]}/>);
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', {name:lessons[0].story[3]}));
    expect(screen.getByText(/Cùng nhìn lại thứ tự nhé/)).toBeTruthy();
    await user.click(screen.getByRole('button', {name:lessons[0].story[0]}));
    expect(screen.getByText(/Đúng thứ tự rồi/)).toBeTruthy();
    await user.click(screen.getByRole('button', {name:'Thử lại phần khởi động'}));
    expect(screen.queryByText(/Đúng thứ tự rồi/)).toBeNull();
  });
  it('never fabricates demo results and filters the actual available completed scores', async () => {
    const view = render(<MemoryRouter><Guardian/></MemoryRouter>);
    expect(screen.getByText('Tiến độ trải nghiệm trong phiên này')).toBeTruthy();
    expect(screen.getAllByText('Chưa có kết quả hoàn thành')).toHaveLength(7);
    state.user = {uid:'test-guardian'}; state.progress = {[lessons[0].id]:completed(2)};
    view.rerender(<MemoryRouter><Guardian/></MemoryRouter>);
    expect(screen.getByText('Tiến độ của tài khoản hiện tại')).toBeTruthy();
    await userEvent.setup().click(screen.getByRole('button',{name:'Cần đọc lại'}));
    expect(screen.getByText('2/3 câu đúng · Đã hoàn thành')).toBeTruthy();
    expect(screen.queryByText('Chưa có kết quả hoàn thành')).toBeNull();
    expect(screen.getByRole('link', {name:'Bắt đầu đọc'}).getAttribute('href')).toBe('/learn/meo-ben-cua-so');
  });
});
