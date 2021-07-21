import Client from '@/utils/http';

const request = new Client({
  baseURL: '/douhot/admin/v1/',
  timeout: 600000,
  withCredentials: true,
});

console.log(request);

export function testHttp() {
  return request.get('/calendar/100/detail');
}
