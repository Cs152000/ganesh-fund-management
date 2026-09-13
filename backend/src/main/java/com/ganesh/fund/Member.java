package com.ganesh.fund;
import jakarta.persistence.*;
@Entity @Table(name="members") public class Member { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false) public String name; public String role; public String phone; public Member(){} public Member(String n,String r,String p){name=n;role=r;phone=p;} }
