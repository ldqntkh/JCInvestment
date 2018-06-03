import React, { Component } from 'react';
import {
    Text,
    Image,
    View,
    TouchableOpacity
} from 'react-native';

import MarqueeText from 'react-native-marquee';

import { workerItemStyle } from '../../../styleSheets/worker/workerItemStyle';

import {
    DISCONNECT
} from '../../../const/variableLabel';

class WorkerItemComponent extends Component {

    constructor(props) {
        super(props);
    }

    gotoWorkerDetails = (workerItem) => {
        this.props.navigation.navigate("WorkerItemDetails", {workerId: workerItem.workerId, status: workerItem.status});
    }

    render () {
        let workerItem = JSON.parse(this.props.workerItem);
        let imageSource = workerItem.status ? require('../../../../public/images/mining-animation.gif') : require('../../../../public/images/mining.png');
        return (
            <TouchableOpacity onPress={() => this.gotoWorkerDetails(workerItem)}>
                <View style={ workerItemStyle.parent }>
                    <Image source={ imageSource } style={ workerItemStyle.imageWorker } />
                    { workerItem.status ? 
                        <View style={workerItemStyle.workerInfo}>
                            {workerItem.workerName.length < 10 ? 
                                <Text style={ workerItemStyle.activeText }>{workerItem.workerName}</Text>:
                                <MarqueeText
                                    style={ workerItemStyle.activeText }
                                    duration={3000}
                                    marqueeOnStart
                                    loop
                                    marqueeDelay={1000}
                                    marqueeResetDelay={1000}
                                >
                                {workerItem.workerName}
                                </MarqueeText>
                            }
                            
                            <Text style={ workerItemStyle.activeText }>{workerItem.hashrate.toFixed(2)} Mhz/s</Text>
                        </View> 
                        : <Text style={ workerItemStyle.inactiveText }> {DISCONNECT} </Text>}
                </View>
            </TouchableOpacity>
        )
    }
}

export default WorkerItemComponent