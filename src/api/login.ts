import http from "@/axios";

class Login {
  search(searchkey: string) {
    return http.get("/modules/article/search.php", {
      params: { searchkey: searchkey },
    });
  }
  searchGithub() {
    return http.get("/s?wd=proxy");
  }
}

export const login = new Login();
