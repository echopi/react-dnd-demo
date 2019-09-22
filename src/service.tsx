export interface SortbyMap {
  [key: number]: number;
}
export async function postDoctorOrders(sortby: SortbyMap) {
  const url = "https://www.rongjiangcommunity.cn/api/doctor/sort";
  const result = await fetch(url, {
    mode: "cors",
    body: JSON.stringify({ sortby }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(res => res.json())
    .catch(e => {
      console.error(e);
      throw e;
    });
  console.log(result);
}

export async function fetchItems() {
  const url = "https://www.rongjiangcommunity.cn/api/doctor/doctors";
  const json = await fetch(url, { mode: "cors" })
    .then(res => res.json())
    .catch(e => {
      console.error(e);
      return {
        data: [],
      }
    });
  const data = json && json.data || [];
  return data.map((item: { text: any; name: any; }) => {
    item.text = item.name;
    return item;
  });
}
