import Client from '@/utils/http';

const request = new Client({
  baseURL: 'https://fk.jztgh.com:8081/api',
  timeout: 600000,
  withCredentials: true,
});

export function loginData(params: any) {
  return request.post('/login', params);
}

export function subFormData(params: any) {
  return request.post('/visit/submit', params);
}

export function visitAudit(params: any) {
  return request.post('/visit/audit', params);
}

export function getUserList(params: any) {
  return request.post('/getUserList', params);
}

export function getVisitList(params: any) {
  return request.get('/visit/list', params);
}

export function getVisitListById(params: any) {
  return request.post('/visit/list/byuserid', params);
}

export function getVisitDetail(params: any) {
  return request.post('/getPhotoByRecordId', params);
}
