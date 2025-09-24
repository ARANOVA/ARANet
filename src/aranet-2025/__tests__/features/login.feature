Feature: Login

  Scenario: Usuario intenta iniciar sesión 
    Given el usuario abre la página de login
    When el usuario introduce credenciales inválidas
    And presiona el botón "Acceder"
    Then debería ver un mensaje de error

  Scenario: Usuario inicia sesión correctamente pero no tiene permisos para el dashboard
    Given el usuario abre la página de login
    When el usuario introduce sus credenciales válidas
    And presiona el botón "Acceder"
    Then debería ver su panel de control
