    osascript <<EOF
tell application "iTerm2"
  tell current session of current window
    set new_session to split $SPLIT_DIRECTION with default profile
      tell new_session
        delay 1
		    write text "source $CMD"
      end tell
  end tell
end tell
EOF
