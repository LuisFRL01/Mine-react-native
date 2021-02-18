import { Dimensions } from 'react-native';

const params = {
    headerRatio: 0.15,
    blockSize: 30,
    fontSize: 15,
    borderSize: 5,
    difficutLevel: 0.1,
    getColumnsAmount(){
        return Math.floor(Dimensions.get("window").width / this.blockSize);
    },
    getRowsAmount(){
        const totalHeight = Dimensions.get("window").height;
        const boardHeight = totalHeight * (1 - this.headerRatio);
        return Math.floor(boardHeight / this.blockSize);
    }
}

export default params