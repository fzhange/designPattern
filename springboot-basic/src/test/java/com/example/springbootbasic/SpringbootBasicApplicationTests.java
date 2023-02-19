package com.example.springbootbasic;

import com.example.springbootbasic.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.Comparator;


class TT {
  public static void main(String[] args) {
    User x[] = {new User(1, "1", "1"), new User(2, "2", "2")};
    Arrays.sort(x, new Comparator<User>() {
        @Override
        public int compare(User a, User b) {
          if (a.getId() < b.getId()) return 1;
          if (a.getId() == b.getId()) return 0;
          if (a.getId() > b.getId()) return -1;
          return 0;
        }
      }
    );

    System.out.println(Arrays.toString(x));

  }
}

@SpringBootTest
@Slf4j
class SpringbootBasicApplicationTests {


  @Test
  void contextLoads() {
    log.info("1312");
  }

}
