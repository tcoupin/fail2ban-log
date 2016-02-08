# fail2ban-log
Script pour extraire les ip bannies et générer un geojson

Usage :
-------

```
./fail2ban-log LOGFILE [OLD_GEOJSON]
```

le geojson de sortie est dans le stdout, le reste dans stderr.

Stockage :
----------
Le dossier data contient mon `geojson.json` alimenté régulièrement.

