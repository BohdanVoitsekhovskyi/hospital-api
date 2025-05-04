package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "doctors")
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "doctors_id_gen")
    @SequenceGenerator(name = "doctors_id_gen", sequenceName = "doctors_doctor_id_seq", allocationSize = 1)
    @Column(name = "doctor_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.EAGER, optional = false)
    @ColumnDefault("nextval('doctors_doctor_id_seq')")
    @JoinColumn(name = "doctor_id", nullable = false)
    private User users;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "specialization_id")
    private Specialization specialization;

    @Column(name = "rating")
    private Double rating;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;

}