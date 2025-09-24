Feature: Login

  Scenario: Usuario admin inicia sesión correctamente
    Given el usuario abre la página de login
    When el usuario "pablo" introduce credenciales válidas de un administrador
    And presiona el botón "Acceder"
    Then debería ver el dashboard
    And debería ver "pablo" en la parte superior derecha
    And debería ver el acceso a la sección de "Administración"
  
  Scenario: Usuario intenta iniciar sesión 
    Given el usuario abre la página de login
    When el usuario introduce credenciales inválidas
    And presiona el botón "Acceder"
    Then debería ver un mensaje de error

  Scenario: Usuario inicia sesión correctamente pero no tiene permisos para el dashboard
    Given el usuario abre la página de login
    When el usuario introduce sus credenciales válidas
    And presiona el botón "Acceder"
    Then debería ver el dashboard
