import React, { useState, useEffect } from "react";
import { Button } from "antd";
import SearchBox from "./SearchBox";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "antd";

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
    navigate(
      `/test-status/${selectedData.testName
        ?.replace(/\s+/g, "-")
        .toLowerCase()}`
    );
  };

  const handleDeleteClick = async () => {
    const testID = selectedData?._id;

    if (!testID) {
      console.error("Test ID is undefined or null.");
      return;
    }

    try {
      const response = await fetch(`/teacher/delete-test/${testID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Delete success:", result.message);
        navigate("/assigned-test");
      } else {
        const errorData = await response.json();
        console.error("Failed to delete the test. Error:", errorData);
      }
    } catch (error) {
      console.error("Error occurred while deleting the test:", error);
    }
  };

  const handleSelectTest = (e, index) => {
    if (selectRef) {
      selectRef.classList.remove("selected__test");
    }
    selectRef = e.currentTarget;
    e.currentTarget.classList.add("selected__test");
    selectedData = tests[index];
    console.log(selectedData);
    //console.log();
  };

  return (
    <>
      <div className="select__test__wrapper">
        <p className="test__wrapper__heading">Assigned Test</p>
        <div className="select__test__search__box">
          <p className="search__box__heading">Search Test</p>
          {<SearchBox handleListData={handleListData} />}
          <div className="test__wrapper__body">
            <p className="test__wrapper__heading select__heading">
              Select Test
            </p>
            <div className="select__test__body">
              {tests.length > 0 ? (
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
          <Button type="danger" onClick={handleDeleteClick}>
            Delete
          </Button>
          <Button type="primary" onClick={handleButtonClick}>
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}
