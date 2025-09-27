#!/bin/bash
#set -e

# Carpeta donde guardaremos los XSDs
XSD_DIR="./verifactu-dev/xsd2"
mkdir -p "$XSD_DIR"

# URLs oficiales de AEAT
XSD_URLS=(
  "xmldsig-core-schema.xsd https://www.w3.org/TR/xmldsig-core/xmldsig-core-schema.xsd"
  "SuministroLR.xsd https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroLR.xsd"
  "SuministroInformacion.xsd https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/SuministroInformacion.xsd"
  "ConsultaLR.xsd https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/ConsultaLR.xsd"
  "RespuestaSuministro.xsd https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tike/cont/ws/RespuestaSuministro.xsd"
  "RespuestaConsultaLR.xsd https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/tikeV1.0/cont/ws/RespuestaConsultaLR.xsd"
)

echo "Descargando XSDs..."
for item in "${XSD_URLS[@]}"; do
  file=$(echo "$item" | cut -d' ' -f1)
  url=$(echo "$item" | cut -d' ' -f2)
  echo "  -> $file"
  # -L sigue redirecciones
  curl -sSL "$url" -o "$XSD_DIR/$file"
done

echo "Reescribiendo schemaLocation a rutas locales..."
for file in "$XSD_DIR"/*.xsd; do
  # Reemplaza schemaLocation="...URL..." por schemaLocation="./nombre.xsd"
  # Compatible Linux y macOS
  if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -E 's|schemaLocation=["'"'"']https?://[^"'"'"']+/([^/"]+\.xsd)["'"'"']|schemaLocation="./\1"|g' "$file"
  else
    sed -i -E 's|schemaLocation=["'"'"']https?://[^"'"'"']+/([^/"]+\.xsd)["'"'"']|schemaLocation="./\1"|g' "$file"
  fi
done

echo "Listo. Todos los XSDs apuntan a rutas locales en $XSD_DIR"
