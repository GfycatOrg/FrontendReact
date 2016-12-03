#!/bin/sh

# Use -gt 1 to consume two arguments per pass in the loop (e.g. each
# argument has a corresponding value to go with it).
# Use -gt 0 to consume one or more arguments per pass in the loop (e.g.
# some arguments don't have a corresponding value to go with it such
# as in the --default example).
# note: if this is set to -gt 0 the /etc/hosts part is not recognized ( may be a bug )

while [[ $# -gt 1 ]]
do
key="$1"

case $key in
  -d|--destination)
  DESTINATION="$2"
  shift # past argument
  ;;
esac
shift # past argument or value
done

if [[ -n $1 ]]; then
  echo "Last line of file specified as non-opt/last argument"
  exit 1
fi

if [ ! -d "$DESTINATION" ]; then
  echo ERROR: destination directory $DESTINATION does not exist
  exit 1
fi

SOURCES=(bin build config dist server package.json .babelrc .gitignore)

for DIR in "${SOURCES[@]}"
do
  cp -vR "${DIR}" "${DESTINATION}"
done

#EOF
