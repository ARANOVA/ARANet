Feature: Nuevo cliente AEAT

  @aeat
  Scenario: Se accede a la web de AEAT para Verifactu y se crea un nuevo cliente
    Given el usuario abre la página de Verifactu de la AEAT con certificado válido
    When pulsa el enlace "Clientes"
    And pulsa el enlace "Nuevo cliente"
    Then rellena los datos del formulario de nuevo cliente con:
      | idtipopersonarec | J |
      | idNombreContraparte | Tecco, S.L. |
      | idNifContraparte           | B50577931     |
      | idviareceptor     | Pol. Malpica, C/ F Oeste, Grupo Quejido, 77 |
      | idcpreceptor        | 50057        |
      | idpoblacionrec | Zaragoza         |
      | idprovinciarec | Zaragoza        |
      | idpaisrec | ES |
    And presiona el botón "Guardar"
    Then debería ver el mensaje "El cliente se ha creado correctamente"

