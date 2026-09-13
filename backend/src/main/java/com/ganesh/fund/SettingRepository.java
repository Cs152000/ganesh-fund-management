package com.ganesh.fund;
import org.springframework.data.jpa.repository.JpaRepository;import java.util.*;
public interface SettingRepository extends JpaRepository<Setting,Long> { Optional<Setting> findById(Long id); }
