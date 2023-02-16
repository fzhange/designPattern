package com.example.springbootbasic.components;

import com.example.springbootbasic.entity.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.Comparator;

@SpringBootTest
public class AnimalTest {
  @Autowired
  private User user;

  @Test
  void Animal() {

  }

  @Test
  void TestInit() {
    User x[] = {new User(1, "1", "1"), new User(2, "2", "2")};
    Arrays.sort(x, new Comparator<User>() {
        @Override
        public int compare(User a, User b) {
          if (a.getId() < b.getId()) return -1;
          if (a.getId() == b.getId()) return 0;
          if (a.getId() > b.getId()) return 1;
          return 0;
        }
      }
    );
  }
}
