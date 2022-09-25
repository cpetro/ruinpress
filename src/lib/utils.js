export function fuck(data) {
  const response = data?.reduce((a,x) => {
    a[x.id] = x;
    return a;
  },{});

  return response;
}
