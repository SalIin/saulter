export const REGEXP = {
  EMAIL:
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  PASSWORD: /^(?=.*\d)(?=.*[A-Za-z])[\w!@#$%^&*()-+=]{6,16}$/i,
};
