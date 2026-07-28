import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { CodePlayground } from '../CodePlayground';

afterEach(cleanup);

describe('CodePlayground Component', () => {
  it('renders correctly with default python snippet', () => {
    render(<CodePlayground />);
    
    // Check if the title is present
    expect(screen.getByText(/Interactive Code Sandbox/i)).toBeDefined();
    
    // Check for the run button
    const runButton = screen.getByRole('button', { name: /Run Code/i });
    expect(runButton).toBeDefined();

    // Check that editor has the default content
    const editor = screen.getByRole('textbox') as HTMLTextAreaElement;
    expect(editor.value).toContain('class UserProfile:');
  });

  it('updates code when typing', () => {
    render(<CodePlayground />);
    
    const editor = screen.getByRole('textbox') as HTMLTextAreaElement;
    fireEvent.change(editor, { target: { value: 'print("Hello World")' } });
    
    expect(editor.value).toBe('print("Hello World")');
  });

  it('handles Ask AI Tutor click if provided', () => {
    const mockOnAskAITutor = vi.fn();
    render(<CodePlayground onAskAITutor={mockOnAskAITutor} />);
    
    const askButton = screen.getByRole('button', { name: /AI Code Review/i });
    fireEvent.click(askButton);
    
    expect(mockOnAskAITutor).toHaveBeenCalledTimes(1);
    expect(mockOnAskAITutor).toHaveBeenCalledWith(
      expect.stringContaining('Please perform a staff-level code review'),
      'code_review'
    );
  });
});
