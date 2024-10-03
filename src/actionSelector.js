import topogReportsPending from "./services/topogReportsPending.js";

export default function actionSelector(msg) {
    topogReportsPending(msg);
}