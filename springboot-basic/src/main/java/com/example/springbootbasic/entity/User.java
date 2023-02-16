package com.example.springbootbasic.entity;

import lombok.*;
import org.springframework.stereotype.Component;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Component
public class User {
  private Integer id;
  private String name;
  private String passwd;
}
