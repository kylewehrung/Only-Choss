import React from "react"
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from "styled-components";
import PropTypes from 'prop-types';


const ChatBotHelper = () => {
    class DBPedia extends React.Component {
        constructor(props) {
          super(props);
      
          this.state = {
            
            result: '',
            trigger: false,
          };
      
          this.triggetNext = this.triggetNext.bind(this);
        }
      
        componentDidMount() {
            const { steps } = this.props;
            const search = steps.search.value;
            const endpoint = 'https://dbpedia.org/sparql';
            const query = `
            select * where {
              ?x rdfs:label ?label .
              ?x rdfs:comment ?comment .
              FILTER (lang(?comment) = 'en' && regex(str(?label), "${search.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')}", "i"))
            } LIMIT 100
          `;
          
          
          const queryUrl = `${endpoint}/?default-graph-uri=&query=${encodeURIComponent(query)}&format=json`;

          
            fetch(queryUrl)
              .then(response => response.json())
              .then(data => {
                const bindings = data.results.bindings;
                if (bindings && bindings.length > 0) {
                  this.setState({ result: bindings[0].comment.value });
                } else {
                  this.setState({ result: 'Not found.' });
                }
              })
              .catch(error => {
                console.error('Error occurred while fetching data:', error);
                this.setState({ result: 'Error occurred while fetching data.' });
              });
          }
          
      
        triggetNext() {
          this.setState({ trigger: true }, () => {
            this.props.triggerNextStep();
          });
        }
      

        render() {
          const { trigger, result } = this.state;
      
          return (
            <div className="dbpedia">
              {result }
              {
                
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 20,
                  }}
                >
                  {
                    !trigger &&
                    <button
                      onClick={() => this.triggetNext()}
                    >
                      Search Again
                    </button>
                  }
                </div>
              }
            </div>
          );
        }
      }
      
      DBPedia.propTypes = {
        steps: PropTypes.object,
        triggerNextStep: PropTypes.func,
      };
      
      DBPedia.defaultProps = {
        steps: undefined,
        triggerNextStep: undefined,
      };




  const steps = [
    {
      id: '1',
      message: 'Hello!',
      trigger: '2'
    },
    {
      id: '2',
      message: "How can I help you?",
      trigger: '3'
    },
    {
      id: '3',
      options: [
       
        { value: 3, label: 'What is bouldering?', trigger: '6' },
        { value: 4, label: 'Type something to search on Wikipédia. (Ex.: Climbing)', trigger: 'search' }
      ]
    },
    
    
    {
      id: '6',
      message: 'Bouldering is a form of climbing that is performed on small rock formations or artificial rock walls without the use of ropes or harnesses. While bouldering can be done without any equipment, most climbers use climbing shoes to help secure footholds, chalk to keep their hands dry and to provide a firmer grip, and bouldering mats to prevent injuries from falls.',
      trigger: '2'
    },
    
      {
        id: 'search',
        user: true,
        trigger: '10',
      },
      {
        id: '10',
        component: <DBPedia />,
        waitAction: true,
        trigger: '2',
      },
  ];






  return (
    <>
      <ThemeProvider theme={CHATBOT_THEME}>
        <ChatBot steps={steps} floating={true} />
      </ThemeProvider>
    </>
  );
  }




const CHATBOT_THEME = {
    background: "#FFFEFC",
    fontFamily: "Roboto",
    headerBgColor: "#FFBFB5",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#C8D7C2",
    botFontColor: "#fff",
    userBubbleColor: "#FFBFB5",
    userFontColor: "#fff",
  };


export default ChatBotHelper



