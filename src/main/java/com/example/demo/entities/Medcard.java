package com.example.demo.entities;

import com.example.demo.models.Gender;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "medcards")
public class Medcard {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "medcards_id_gen")
    @SequenceGenerator(name = "medcards_id_gen", sequenceName = "medcards_medcard_id_seq", allocationSize = 1)
    @Column(name = "medcard_id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "address_id")
    private Address address;

    @Column(name = "bithday")
    private LocalDate bithday;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender",nullable = false)
    private Gender gender;

}