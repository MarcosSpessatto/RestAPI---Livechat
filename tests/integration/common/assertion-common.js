export const errorAssertion = response => {
  if(!('message' in response.body)) throw new Error('Missing "message" property ');
  if(!('success' in response.body)) throw new Error('Missing "message" property ');

  return response;
};