import React, { useState, useEffect } from "react";
import { Button } from "antd";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";
import DateComponent from "../../Components/Date/DateComponent";

export default function TestList(props) {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [searchTests, setSearchTests] = useState([]);
  const [searching, setSearching] = useState("");

  useEffect(() => {
    setTests(props.tests.reverse());
  }, [props]);

  const handleListData = (searchTerm) => {
    if (searchTerm === "") setSearching(searchTerm);
    else {
      setSearching(true);
      setSearchTests(
        tests.filter((test) => test.testName.toLowerCase().includes(searchTerm))
      );
    }
  };

  let selectRef,
    selectedData = {};

  const handleButtonClick = () => {
    props.handleSelectedTest(selectedData);
    navigate("/test-instructions");
  };

  const handleSelectTest = (e, index) => {
    if (selectRef) {
      selectRef.classList.remove("selected__test");
    }
    selectRef = e.currentTarget;
    e.currentTarget.classList.add("selected__test");
    selectedData = tests[index];

    //console.log();
  };

  // Get the current date
  const currentDate = new Date();

  // Format the start date (current date)
  const startDate = currentDate.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  // Calculate the end date by adding days
  const endDate = new Date();
  endDate.setDate(currentDate.getDate());

  // Format the end date
  const formattedEndDate = endDate.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
  });

  return (
    <>
      <div className="select__test__wrapper">
        <p className="test__wrapper__heading">Available Test</p>
        <div className="select__test__search__box">
          <p className="search__box__heading">Search Test</p>
          {<SearchBox handleListData={handleListData} />}
          <div className="test__wrapper__body">
            <p className="test__wrapper__heading select__heading">
              Select Test
            </p>
            <div className="select__test__body">
              {tests && tests.length > 0 ? (
                searching !== "" ? (
                  searchTests.map((test, index) => (
                    <div
                      key={index}
                      className={`test__wrapper`}
                      onClick={(e) => {
                        handleSelectTest(e, index);
                      }}
                    >
                      <p className="select__test" key={index}>
                        {test.testName}
                      </p>
                      <div className="test__time">
                        <DateComponent />
                      </div>
                    </div>
                  ))
                ) : (
                  tests.map((test, index) => (
                    <div
                      key={index}
                      className={`test__wrapper`}
                      onClick={(e) => {
                        handleSelectTest(e, index);
                      }}
                    >
                      <p className="select__test" key={index}>
                        {test.testName}
                      </p>
                      <div className="test__time">
                        <DateComponent />{" "}
                      </div>
                    </div>
                  ))
                )
              ) : (
                <div className="select__skeleton">
                  <div className="select__single-skeleton">
                    <Skeleton.Avatar
                      className="select__avatar-skelton"
                      active={true}
                      size="default"
                      shape="square"
                    />
                    <Skeleton.Input
                      className="select__input-skelton"
                      active={true}
                      size="default"
                    />
                  </div>
                  <div className="select__single-skeleton">
                    <Skeleton.Avatar
                      className="select__avatar-skelton"
                      active={true}
                      size="default"
                      shape="square"
                    />
                    <Skeleton.Input
                      className="select__input-skelton"
                      active={true}
                      size="default"
                    />
                  </div>
                  <div className="select__single-skeleton">
                    <Skeleton.Avatar
                      className="select__avatar-skelton"
                      active={true}
                      size="default"
                      shape="square"
                    />
                    <Skeleton.Input
                      className="select__input-skelton"
                      active={true}
                      size="default"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="select__button">
          <Button type="primary" onClick={handleButtonClick}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
