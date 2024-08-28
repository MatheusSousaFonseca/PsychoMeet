package br.psychomeet.backend.lds.backend.main.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class UserModel {

    private int id;
    private String email;
    private String password;
    private String fullName;

}
