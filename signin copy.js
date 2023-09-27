import * as React from "react";
import { Image, StyleSheet, Text, View ,SafeAreaView} from "react-native";
import { Padding, Color, Border, FontSize, FontFamily } from "./GlobalStylessignin";

const SignInPageV2 = ({ navigation }) => {
  // Use navigation.setOptions to hide the header
React.useLayoutEffect(() => {
navigation.setOptions({
  headerShown: false, // Hide the header for this screen
});
}, [navigation]);
  return (
    
    <View style={[styles.signInPageV2, styles.frameFlexBox2]}>
      <View style={styles.frame}>
        <Image
          style={styles.visitmalaysia262Icon}
          resizeMode="cover"
          source={require("./assets/visitmalaysia26-2.png")}
        />
        <View style={styles.frame1}>
          <Text style={styles.welcomeBack}>Welcome back</Text>
        </View>
      </View>
      <View style={[styles.frame2, styles.frameFlexBox2]}>
        <View style={[styles.frame3, styles.frameFlexBox1]}>
          <View style={[styles.emailWrapper, styles.emailWrapperShadowBox]}>
            <Text style={[styles.email, styles.emailTypo]}>Email</Text>
          </View>
          <View style={[styles.passwordParent, styles.frameFlexBox]}>
            <Text style={[styles.email, styles.emailTypo]}>Password</Text>
            <Image
              style={styles.mdieyeOffIcon}
              resizeMode="cover"
              source={require("./assets/mdieyeoff.png")}
            />
          </View>
        </View>
        <View style={[styles.frame4, styles.frame4SpaceBlock]}>
          <View style={[styles.frame5, styles.frameFlexBox2]}>
            <View style={[styles.frame3, styles.frameFlexBox1]}>
              <View style={styles.signInWrapper}>
                <Text style={[styles.signIn, styles.emailTypo]}>Sign In</Text>
              </View>
              <View style={[styles.frame7, styles.frameFlexBox]}>
                <Text style={[styles.forgotPassword, styles.getHelpTypo]}>
                  Forgot Password?
                </Text>
                <Text style={[styles.forgotPassword, styles.getHelpTypo]}>
                  Sign up now
                </Text>
              </View>
            </View>
            <View style={styles.frame8}>
              <View style={[styles.frame9, styles.frameFlexBox]}>
                <Image
                  style={[
                    styles.materialSymbolslanguageIcon,
                    styles.frame11Layout,
                  ]}
                  resizeMode="cover"
                  source={require("./assets/materialsymbolslanguage.png")}
                />
                <Text style={[styles.forgotPassword, styles.getHelpTypo]}>
                  Change Language
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.frame10}>
            <View style={[styles.frame11, styles.frame11Layout]}>
              <Image
                style={[
                  styles.materialSymbolslanguageIcon,
                  styles.frame11Layout,
                ]}
                resizeMode="cover"
                source={require("./assets/materialsymbolshelp.png")}
              />
              <Text style={[styles.getHelp, styles.getHelpTypo]}>Get help</Text>
            </View>
          </View>
        </View>
        <Text style={[styles.byLoggingInContainer, styles.getHelpTypo]}>
          <Text
            style={styles.byLoggingIn}
          >{`By logging in, it’s redeemed that you have read and agreed to Epic Travel `}</Text>
          <Text style={styles.termsOfUse}>Terms of Use</Text>
          <Text style={styles.byLoggingIn}>{` and `}</Text>
          <Text style={styles.termsOfUse}>Privacy Policy</Text>
          <Text style={styles.byLoggingIn}>.</Text>
        </Text>
      </View>
    </View>
  
  );
};

const styles = StyleSheet.create({
  frameFlexBox2: {
    justifyContent: "flex-end",
   
  },
  frameFlexBox1: {
    alignItems: "center",
    overflow: "hidden",
  },
  emailWrapperShadowBox: {
    paddingHorizontal: Padding.p_2xs,
    borderWidth: 0.5,
    borderColor: Color.colorLightsteelblue,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.05)",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_3xs,
    alignSelf: "stretch",
  },
  emailTypo: {
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  frameFlexBox: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  frame4SpaceBlock: {
    marginTop: 30,
    alignSelf: "stretch",
  },
  getHelpTypo: {
    letterSpacing: 0.2,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
  },
  frame11Layout: {
    height: 24,
    overflow: "hidden",
  },
  visitmalaysia262Icon: {
    width: 147,
    height: 72,
  },
  welcomeBack: {
    fontSize: FontSize.size_lg,
    letterSpacing: 0.3,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
  },
  frame1: {
    marginTop: 43,
    justifyContent: "center",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  frame: {
    alignItems: "flex-end",
    alignSelf: "stretch",
    overflow: "hidden",
    
  },
  email: {
    fontFamily: FontFamily.montserratRegular,
    color: Color.colorDarkslateblue_300,
    width: 140,
    height: 20,
  },
  emailWrapper: {
    height: 41,
    paddingVertical: 0,
    justifyContent: "center",
  },
  mdieyeOffIcon: {
    width: 20,
    height: 20,
    overflow: "hidden",
  },
  passwordParent: {
    paddingVertical: 10,
    marginTop: 16,
    paddingHorizontal: Padding.p_2xs,
    borderWidth: 0.5,
    borderColor: Color.colorLightsteelblue,
    borderStyle: "solid",
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.05)",
    backgroundColor: Color.colorWhitesmoke,
    borderRadius: Border.br_3xs,
    alignSelf: "stretch",
  },
  frame3: {
    alignSelf: "stretch",
  },
  signIn: {
    color: Color.colorMidnightblue_100,
    fontFamily: FontFamily.montserratSemiBold,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    alignSelf: "stretch",
  },
  signInWrapper: {
    backgroundColor: Color.colorOrange,
    paddingHorizontal: 193,
    paddingVertical: 8,
    borderRadius: Border.br_3xs,
    alignSelf: "stretch",
  },
  forgotPassword: {
    color: Color.colorMidnightblue_100,
  },
  frame7: {
    marginTop: 17,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  materialSymbolslanguageIcon: {
    width: 24,
  },
  frame9: {
    width: 151,
    overflow: "hidden",
  },
  frame8: {
    marginTop: 314,
    justifyContent: "center",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  frame5: {
    alignSelf: "stretch",
  },
  getHelp: {
    marginLeft: 10,
    color: Color.colorMidnightblue_100,
  },
  frame11: {
    width: 88,
    flexDirection: "row",
    height: 24,
    alignItems: "center",
  },
  frame10: {
    marginTop: 26,
    justifyContent: "center",
    alignSelf: "stretch",
    overflow: "hidden",
  },
  frame4: {
    alignItems: "center",
    overflow: "hidden",
  },
  byLoggingIn: {
    color: Color.colorBlack,
  },
  termsOfUse: {
    color: Color.colorMidnightblue_100,
  },
  byLoggingInContainer: {
    marginTop: 30,
    alignSelf: "stretch",
  },
  frame2: {
    marginTop: 33,
    alignSelf: "stretch",
  },
  signInPageV2: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
    paddingHorizontal: 19,
    paddingTop: 60,
    paddingBottom: 61,
  },
});

export default SignInPageV2;
