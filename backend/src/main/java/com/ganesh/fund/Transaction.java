package com.ganesh.fund;
import jakarta.persistence.*;import java.math.BigDecimal;import java.time.LocalDate;
@Entity @Table(name="transactions") public class Transaction { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false) public LocalDate date; @Column(nullable=false) public String type; @Column(nullable=false) public String person; public String description; @Column(nullable=false,precision=12,scale=2) public BigDecimal amount; @ManyToOne(fetch=FetchType.LAZY) public User createdBy; public Transaction(){} }
