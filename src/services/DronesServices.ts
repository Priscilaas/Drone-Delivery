import Access from "../access";

class DronesServices {
  getAll() {
    return Access.get(`/`);
  }
  getDroneId(id: string) {
    return Access.get(`/drones/${id}`);
  }
  getListPage(page: number) {
    return Access.get(`?_page=${page}&_limit=20`);
  }
}

export default new DronesServices();