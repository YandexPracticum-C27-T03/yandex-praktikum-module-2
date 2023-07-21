import { useFullscreenMock } from '@@shared/hooks/useFullscreen';
import { render, renderHook } from '@testing-library/react';
import { FullScreenContainer } from '../FullscreenContainer';

const ACTIVE_CLASSNAME = 'FullscreenContainer_active';

describe('FullscreenContainerTest', () => {
  test('render with active class', () => {
    const { result } = renderHook(() => useFullscreenMock(true));

    const { container } = render(
      <FullScreenContainer controller={result.current}>
        <div></div>
      </FullScreenContainer>,
    );

    const element = container.getElementsByClassName(ACTIVE_CLASSNAME);

    expect(element.length).toBe(1);
  });

  test('render without active class', () => {
    const { result } = renderHook(() => useFullscreenMock());

    const { container } = render(
      <FullScreenContainer controller={result.current}>
        <div></div>
      </FullScreenContainer>,
    );

    const element = container.getElementsByClassName(ACTIVE_CLASSNAME);

    expect(element.length).toBe(0);
  });
});
