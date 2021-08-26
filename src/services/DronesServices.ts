import Access from "../access";

class DronesServices {
  getAll() {
    return Access.get(`/`);
  }
  getDroneId(id: number) {
    return Access.get(`/${id}`);
  }
  getListPage(page: number) {
    return Access.get(`?_page=${page}&_limit=20`);
  }
}

export default new DronesServices();