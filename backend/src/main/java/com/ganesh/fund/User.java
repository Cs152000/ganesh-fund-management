package com.ganesh.fund;
import jakarta.persistence.*;
@Entity @Table(name="users") public class User { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(unique=true,nullable=false) public String username; @Column(nullable=false) public String password; @Column(nullable=false) public String role; public User(){} public User(String u,String p,String r){username=u;password=p;role=r;} }
