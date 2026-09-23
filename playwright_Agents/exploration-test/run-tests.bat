@echo off
echo ============================================
echo Ejecutando Pruebas de Exploración - WaveLink
echo ============================================
echo.

echo 1. Instalando dependencias de Playwright...
call npx playwright install chromium

echo.
echo 2. Ejecutando pruebas de exploración...
call npx playwright test --reporter=html --output=reports/

echo.
echo 3. Abriendo reporte HTML...
if exist "reports\html-report\index.html" (
    echo Reporte generado en: reports\html-report\index.html
    echo.
    echo Para abrir el reporte, ejecute:
    echo npx playwright show-report reports/html-report
) else (
    echo Error: No se pudo generar el reporte HTML
)

echo.
echo ============================================
echo Exploración completada
echo ============================================