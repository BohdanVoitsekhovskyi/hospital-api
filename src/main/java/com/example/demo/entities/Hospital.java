package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "hospitals")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "hospitals_id_gen")
    @SequenceGenerator(name = "hospitals_id_gen", sequenceName = "hospitals_hospital_id_seq", allocationSize = 1)
    @Column(name = "hospital_id", nullable = false)
    private Integer id;

    @Column(name = "hospital_name", length = Integer.MAX_VALUE)
    private String hospitalName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id")
    private Address address;

}