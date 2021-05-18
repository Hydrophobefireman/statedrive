import * as factory from "../../src/_hook_factory";

import { useCallback, useEffect, useMemo, useState } from "react";

export const useSharedState = /*#__PURE__*/ factory.createUseSharedState(
  useEffect,
  useState
);

export const useSelector = /*#__PURE__*/ factory.createUseSelector(
  useEffect,
  useState,
  useMemo,
  useCallback
);

export const useSharedStateValue = /*#__PURE__*/ factory.createUseSharedStateValue(
  useSharedState
);

export const useSetSharedState = /*#__PURE__*/ factory.createUseSetSharedState(
  useSharedState
);
