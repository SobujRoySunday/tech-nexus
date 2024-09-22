import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Container from "../../layouts/Container";
import authService from "../../services/auth.service";
import Loader from "../../components/Loader/Loader";
import { useDispatch } from "react-redux";
import { loginProfile } from "../../store/authSlice";

const AddSkill = () => {
  const { addingSkill } = useParams();
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState([]);
  const [ans, setAns] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getTest(addingSkill)
      .then((data) => {
        setTest(data);

        let myAns = [];
        for (let i = 0; i < data.length; i++) {
          myAns.push([false, false, false, false]);
        }
        setAns(myAns);
      })
      .catch((err) => console.log(err));
  }, [addingSkill]);

  const submitTest = () => {
    try {
      setLoading(true);
      let score = 0;
      for (let i = 0; i < test.length; i++) {
        if (ans[i][test[i].answer] == true) {
          score++;
        }
      }

      if (score >= 7) {
        authService.addSkillToProfile(addingSkill).then(() => {
          authService.getProfile().then((profile) => {
            dispatch(loginProfile(profile));
            navigate("/");
          });
        });
      } else {
        setLoading(false);
        alert(
          "You need to score above or equal to 7 to add the skill to your profile"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {loading && <Loader />}
      <div className="flex flex-col gap-8 p-4">
        <h1 className="text-3xl">
          Automated assessment test of &apos;{addingSkill}&apos;
        </h1>

        <p className="text-xl text-red-500">
          Attempt the test and score above or equal to 7 to add the skill to
          your profile
        </p>

        <div className="flex flex-col gap-8">
          {test.map((q, i) => (
            <div key={i} className="flex flex-col p-2 gap-4 border-2">
              <h3 className="text-2xl">{q.question}</h3>
              <div className="flex flex-wrap">
                {q.options.map((option, oi) => (
                  <div key={oi} className="mr-16 flex flex-row gap-2">
                    <input
                      id={`${i}-radio-${oi}`}
                      checked={ans[i][oi]}
                      type="radio"
                      onChange={(e) => {
                        let myAns = [...ans];
                        myAns[i] = myAns.map((a, index) => {
                          if (oi === index) {
                            return true;
                          } else {
                            return false;
                          }
                        });
                        setAns(myAns);
                      }}
                    />
                    <label htmlFor={`${i}-radio-${oi}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={submitTest}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
          >
            Submit
          </button>
        </div>
      </div>
    </Container>
  );
};

export default AddSkill;
