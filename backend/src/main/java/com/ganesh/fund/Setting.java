package com.ganesh.fund;
import jakarta.persistence.*;
@Entity @Table(name="settings") public class Setting { @Id public Long id=1L; public String committeeName; public String festivalYear; public Setting(){} public Setting(String c,String y){committeeName=c;festivalYear=y;} }
