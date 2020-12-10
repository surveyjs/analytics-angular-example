import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core";

import * as SurveyAnalytics from "survey-analytics";
import * as Survey from "survey-angular";

@Component({
  // tslint:disable-next-line:component-selector
  selector: "analytics",
  template: `<div class="survey-container contentcontainer codecontainer">
    <div id="surveyResult"></div>
  </div>`,
})
export class SurveyAnalyticsComponent implements OnInit {
  @Output() submitSurvey = new EventEmitter<any>();
  @Input()
  result: any;

  ngOnInit() {
    const json = {
      completedHtml:
        "<p style='font-size:24px;'>Thank you for completing the survey! (please wait for analytics to load ...)<p>",
      pages: [
        {
          name: "page_info",
          elements: [
            {
              type: "custom-question",
              name: "custom",
              title: "This is a custom question with two values - min and max",
            },
            {
              type: "matrix",
              name: "Quality",
              title:
                "Please indicate if you agree or disagree with the following statements",
              columns: [
                {
                  value: 1,
                  text: "Strongly Disagree",
                },
                {
                  value: 2,
                  text: "Disagree",
                },
                {
                  value: 3,
                  text: "Neutral",
                },
                {
                  value: 4,
                  text: "Agree",
                },
                {
                  value: 5,
                  text: "Strongly Agree",
                },
              ],
              rows: [
                {
                  value: "affordable",
                  text: "Product is affordable",
                },
                {
                  value: "does what it claims",
                  text: "Product does what it claims",
                },
                {
                  value: "better then others",
                  text: "Product is better than other products on the market",
                },
                {
                  value: "easy to use",
                  text: "Product is easy to use",
                },
              ],
            },
            {
              type: "radiogroup",
              name: "organization_type",
              title:
                "Which of the following best describes you or your organization?",
              hasOther: true,
              choices: [
                {
                  value: "ISV",
                  text: "ISV (building commercial/shrink wrapped software)",
                },
                {
                  value: "Consulting",
                  text:
                    "Software consulting firm (provide development services to other organizations)",
                },
                {
                  value: "Custom",
                  text:
                    "Custom software development (as a freelancer/contractor)",
                },
                {
                  value: "In-house",
                  text: "In-house software development",
                },
                {
                  value: "Hobbyist",
                  text: "Hobbyist (develop apps for personal use)",
                },
              ],
              colCount: 2,
            },
            {
              type: "radiogroup",
              name: "developer_count",
              visibleIf: "{organization_type} != 'Hobbyist'",
              title: "How many software developers are in your organization?",
              choices: ["1", "2", "3-5", "6-10", "> 10"],
            },
          ],
        },
      ],
    };

    var survey = new Survey.Model(json);
    var allQuestions = survey.getAllQuestions();
    var data = [
      {
        Quality: {
          affordable: "3",
          "does what it claims": "4",
          "better then others": "5",
          "easy to use": "1",
        },
        custom: { min: 4, max: 10 },
        bool: true,
        organization_type: "In-house",
        developer_count: "6-10",
      },
      {
        Quality: {
          affordable: "3",
          "does what it claims": "4",
          "better then others": "2",
          "easy to use": "3",
        },
        custom: { min: 3, max: 9 },
        bool: true,
        organization_type: "other",
        developer_count: "3-5",
      },
    ];
    var visPanel = new SurveyAnalytics.VisualizationPanel(allQuestions, data, {
      labelTruncateLength: 27,
    });
    visPanel.showHeader = true;
    visPanel.render(document.getElementById("surveyResult"));
  }
}
