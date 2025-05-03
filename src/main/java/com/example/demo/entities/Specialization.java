package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "specializations")
public class Specialization {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "specializations_id_gen")
    @SequenceGenerator(name = "specializations_id_gen", sequenceName = "specializations_specialization_id_seq", allocationSize = 1)
    @Column(name = "specialization_id", nullable = false)
    private Integer id;

    @Column(name = "specialization_name", length = Integer.MAX_VALUE)
    private String specializationName;

}