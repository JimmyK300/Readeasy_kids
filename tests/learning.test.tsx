// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
vi.mock('../src/Firebase/firebase',()=>({auth:null,db:null}));
import { AccountProvider } from '../src/context/authContext';
import { DataProvider } from '../src/context/dataContext';
import Quiz from '../src/components/Quiz';
import Result from '../src/components/Result';
import Start from '../src/components/Start';
import { lessons } from '../src/content/lessons';
afterEach(cleanup);
describe('lesson-specific reading lifecycle',()=>{
  it('gates answers, scores one wrong response, resets and links to next lesson',async()=>{
    render(<MemoryRouter initialEntries={['/learn/an-va-khu-vuon/read']}><AccountProvider><DataProvider><Routes>
      <Route path="/learn/:lessonId/read" element={<Quiz/>}/><Route path="/learn/:lessonId/result" element={<Result/>}/><Route path="/learn/:lessonId" element={<Start/>}/>
    </Routes></DataProvider></AccountProvider></MemoryRouter>);
    const user=userEvent.setup();
    expect((screen.getByRole('button',{name:'Câu tiếp theo'}) as HTMLButtonElement).disabled).toBe(true);
    for(const [index,question] of lessons[0].questions.entries()) {
      const answer=index===0?question.options[1]:question.answer;
      await user.click(screen.getByRole('button',{name:new RegExp(answer)}));
      expect(screen.getAllByText(question.explanation).length).toBeGreaterThan(0);
      expect((screen.getByRole('button',{name:new RegExp(answer)}) as HTMLButtonElement).disabled).toBe(true);
      await user.click(screen.getByRole('button',{name:index===2?'Xem kết quả':'Câu tiếp theo'}));
    }
    expect(screen.getByRole('heading',{name:'Em đã đi hết câu chuyện!'})).toBeTruthy();
    expect(screen.getByText('2')).toBeTruthy();
    expect(screen.getByRole('link',{name:'Bài tiếp theo'}).getAttribute('href')).toBe('/learn/meo-ben-cua-so');
    await user.click(screen.getByRole('button',{name:'Đọc và thử lại'}));
    expect(screen.getByRole('heading',{name:'An ra vườn cùng ai?'})).toBeTruthy();
    expect((screen.getByRole('button',{name:'Câu tiếp theo'}) as HTMLButtonElement).disabled).toBe(true);
  });
});

