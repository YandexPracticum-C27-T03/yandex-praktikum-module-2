import { User, userAdapter } from '@@entities/user';
import { render, screen } from '@testing-library/react';

import { ProfileAvatar } from '../ui/ProfileAvatar';

function hasProps(data: object) {
  return Object.keys(data).length ? data : null;
}

const MOCK_USER = userAdapter({
  id: 1,
  first_name: 'yury',
  second_name: 'test',
  login: 'yury_test',
  avatar: '/3d99498f-e9ba-41e9-a9b0-24f1b37e2e9a/7b0eac8c-243e-459b-a2cb-8691defe01ce_Raichu.png',
  email: 'test_yury@m.ru',
  phone: '79151213490',
} as User);

describe('test profile avatar', () => {
  test('render without user data', () => {
    render(<ProfileAvatar user={null} />);

    expect(hasProps(screen.findByTestId('avatar'))).toBeNull();
  });

  test('render with user data', () => {
    render(<ProfileAvatar user={MOCK_USER} />);

    expect(screen.findByTestId('avatar')).toBeTruthy();
  });
});
