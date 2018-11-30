import { createStackNavigator } from 'react-navigation';

import QuestionScreen from '../screens/QuestionScreen';
import AnswerScreen from '../screens/AnswerScreen';

const QuestionStackNavigator = createStackNavigator({
  Question: {
    screen: QuestionScreen
  },
  Answer: {
    screen: AnswerScreen
  }
}, {
  headerMode: 'none'
});

export default QuestionStackNavigator;
