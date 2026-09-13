package com.ganesh.fund;
import org.springframework.data.jpa.repository.JpaRepository;import java.util.*;
public interface TransactionRepository extends JpaRepository<Transaction,Long> { List<Transaction> findAllByOrderByIdAsc(); }
