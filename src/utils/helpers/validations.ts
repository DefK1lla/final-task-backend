export const validateRegister = (
  username: string,
  password: string
) => {
  return (
    !username &&
    !password &&
    typeof username === 'string' &&
    typeof password === 'string' &&
    username.length > 3 &&
    password.length > 5
  );
};
