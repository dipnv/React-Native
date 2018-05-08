/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 *
 * Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @providesModule SearchBar
 * @flow
 */
'use strict';
var React = require('react');
var ReactNative = require('react-native');

var nativeImageSource = require('nativeImageSource');
import metrics from '../../config/metrics';
import searchIcon from '../../images/home_search.png';
var {
  Image,
  Platform,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
    TouchableOpacity,
    Text,
  View,
} = ReactNative;

var IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21;

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false
        }
    }
  render() {
    var background = IS_RIPPLE_EFFECT_SUPPORTED ?
      TouchableNativeFeedback.SelectableBackgroundBorderless() :
      TouchableNativeFeedback.SelectableBackground();
    return (
            <View style={{marginTop: 0}}>
      <View style={{height: 50, backgroundColor: '#205F8F'}}>
            <Text style={{padding: 10, color: 'white'}}>
            {this.props.text}
            </Text>
            </View>
              { this.state.showSearch ?
                                      <View style={styles.searchBar}>
                                        <TouchableNativeFeedback
                                            background={background}
                                            onPress={() => this.refs.input && this.refs.input.focus()}>
                                          <View>
                                            <Image
                                              source={nativeImageSource({
                                                android: 'android_search_white',
                                                width: 96,
                                                height: 96
                                              })}
                                              style={styles.icon}
                                            />
                                          </View>
                                        </TouchableNativeFeedback>
                                        <TextInput
                                          ref="input"
                                          autoCapitalize="none"
                                          autoCorrect={false}
                                          autoFocus={true}
                                          onChange={this.props.onSearchChange}
                                          placeholder="Search..."
                                          placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                          onFocus={this.props.onFocus}
                                          style={styles.searchBarInput}
                                        />
                                        <ActivityIndicator
                                          animating={this.props.isLoading}
                                          color="white"
                                          size="large"
                                          style={styles.spinner}
                                        />
                                        </View>
            : <View style={{backgroundColor: 'white', height:25}} />
            }
            <TouchableOpacity
            onPress={() => { this.setState({
                                           showSearch: !this.state.showSearch
                                           })
            }}
            style={styles.searchIconStyle}>
            <Image
            animation={'bounceIn'}
            duration={1200}
            delay={200}
            ref={(ref) => this.logoImgRef = ref}
            style={styles.searchImg}
            source={searchIcon}
            />
            </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    padding: 0,
    backgroundColor: 'transparent'
  },
  spinner: {
    width: 30,
    height: 30,
    marginRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
                               searchIconStyle:{
                               marginTop: 25,
                               marginLeft: (metrics.DEVICE_WIDTH - 70),
                               height: 50,
                               width: 50,
                               position: 'absolute'
                               },
                               searchImg: {
                               justifyContent: 'center',
                               height: 50,
                               width: 50,
                               resizeMode: 'contain'
                               }
});

module.exports = SearchBar;
