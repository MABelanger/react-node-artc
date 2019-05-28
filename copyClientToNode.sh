CURREND_DIR=$(pwd)

# delete public folder
cd $CURREND_DIR
rm -rf node/public/
echo 'delete public folder done...'

# buid react
cd react
yarn build

# copy the main/build into public folder
cd $CURREND_DIR
cp -R react/build node/public
echo 'update public folder done...'
