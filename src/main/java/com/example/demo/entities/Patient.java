package com.example.demo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "patients")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patients_id_gen")
    @SequenceGenerator(name = "patients_id_gen", sequenceName = "patients_patient_id_seq", allocationSize = 1)
    @Column(name = "patient_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @ColumnDefault("nextval('patients_patient_id_seq')")
    @JoinColumn(name = "patient_id", nullable = false)
    private User users;

    @Column(name = "medcard_id")
    private Integer medcardId;

}