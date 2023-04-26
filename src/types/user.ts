export class User {
  id: number;
  firstName: string;
  lastName: string;
  shortName: string;
  fullName: string;
  email: string;
  mobilePhone: string;
  gender: number;
  jwt: string;
  accessToken: string;
  accessTokenExpired: number;
  createdDate: number;
  updatedDate: number;

  constructor(fields) {
    Object.assign(this, fields);
  }
}

export function createUser(blob) {
  const {
    id,
    email,
    gender,
    jwt,
    first_name: firstName,
    last_name: lastName,
    mobile_phone: mobilePhone,
    access_token: accessToken,
    expire_token: accessTokenExpired,
    create_date: createdDate,
    update_date: updatedDate,
  } = blob;

  let userNames = [firstName, lastName].filter(name => !!name);
  if (userNames.length === 0) {
    userNames = [email || mobilePhone];
  }

  return new User({
    id,
    firstName,
    lastName,
    shortName: userNames.map(name => String(name || '').charAt(0).toUpperCase()).join(''),
    fullName: userNames.join(' '),
    email,
    mobilePhone,
    gender,
    jwt,
    accessToken,
    accessTokenExpired,
    createdDate,
    updatedDate,
  });
}
