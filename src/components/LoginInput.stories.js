import LoginInput from './LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput,
  tags: ['autodocs'],
  argTypes: {
    login: { action: 'login' },
  },
};

export const Default = {
  args: {
    login: (credentials) => console.log('login called with:', credentials),
  },
};
